/*
Copyright (c) 2021, Developers Club. All rights reserved.
version: 1.0.0
build: 1

# bring class perform an action of appending a link ot scrip to the either head or end of the DOM to use the libraries and reduces page loading time. 
# it is designed to make the web app faster to load and only bring the needed libraries to specific workplace instead of loading whole header file that make the webpage load very slow.
*/
class Bring{    
    constructor(listOfLibraries){
        this.listOfLibraries = [];
         this.components = {};
    }
    addLibrary(library,src,type){
        var data = {library:library,src:src,type:type};
        this.listOfLibraries.push(data);
    }
    bring(library,locatedIn){
        const head = document.querySelector('head');
        const end = document.getElementsByTagName('body')[0];
        // console.log(this.listOfLibraries);
        this.listOfLibraries.forEach(element => {   
            if(element.library == library){
                var link = '';
                console.log(element.type);
                if(element.type=='link'){
                    link = 'href';
                }else if(element.type=='script'){
                    link = 'src';
                }
                if(locatedIn == 'head'){
                    var els = document.createElement(element.type);
                    els.setAttribute(link,element.src);
                    if(element.type=='link'){
                        els.setAttribute('rel','stylesheet');
                    }
                    head.appendChild (els);
                }else if(locatedIn == 'end'){
                    var el = document.createElement(element.type);
                    el.setAttribute(link,element.src);
                    // console.log(element);
                    end.appendChild(el);
                }
            }
        });
    }  

    async renderComponents() {
        const elements = document.querySelectorAll('*');
        for (const element of elements) {
            for (const node of Array.from(element.childNodes)) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const regex = /\{\{bring\.([a-zA-Z0-9_-]+)\(([^)]*)\)\}\}/g; // Match content within parentheses
                    let match;
                    let newNodes = [];
                    let lastIndex = 0;
                    let promises = [];

                    while ((match = regex.exec(node.textContent)) !== null) {
                        const fullMatch = match[0];
                        const componentName = match[1];
                        const attributeString = match[2];
                        const attributes = this._parseMultipleAttributes(attributeString);

                        // Add text before the match
                        if (match.index > lastIndex) {
                            newNodes.push(document.createTextNode(node.textContent.substring(lastIndex, match.index)));
                        }

                        const promise = this._fetchAndCreateComponentNodes(componentName, attributes)
                            .then(componentNodes => {
                                newNodes.push(...componentNodes);
                            })
                            .catch(error => {
                                console.error(`Bring.js: Error processing component "${componentName}":`, error);
                                newNodes.push(document.createTextNode(fullMatch + ' (Error)'));
                            });
                        promises.push(promise);
                        lastIndex = regex.lastIndex;
                    }

                    // Add remaining text
                    if (lastIndex < node.textContent.length) {
                        newNodes.push(document.createTextNode(node.textContent.substring(lastIndex)));
                    }

                    if (newNodes.length > 0) {
                        await Promise.all(promises);
                        node.replaceWith(...newNodes);
                    }
                }
            }
        }
    }

    _parseMultipleAttributes(attributeString) {
        const attributes = {};
        const attributePairs = attributeString.split(',').map(s => s.trim());
        const keyValuePairRegex = /'([^']*)'=>'([^']*)'/;

        for (const pair of attributePairs) {
            const match = pair.match(keyValuePairRegex);
            if (match && match.length === 3) {
                const key = match[1];
                const value = match[2];
                attributes[key] = value;
            } else if (pair) {
                // Handle single string argument (defaults to 'title' as before)
                const value = pair.replace(/'/g, '');
                attributes['title'] = value;
            }
        }
        return attributes;
    }

    async _fetchAndCreateComponentNodes(componentName, attributes) {
        const componentPath = `component/${componentName}.bring.html`;

        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch component "${componentName}" from ${componentPath}`);
            }
            let componentHTML = await response.text();

            // Generalize placeholder replacement
            for (const key in attributes) {
                const placeholder = `{${key}}`;
                const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                componentHTML = componentHTML.replace(regex, attributes[key]);
            }

            const tempElement = document.createElement('div');
            tempElement.innerHTML = componentHTML;
            return Array.from(tempElement.childNodes);
        } catch (error) {
            console.error(`Bring.js: Error fetching component "${componentName}":`, error);
            return [document.createTextNode(`{{bring.${componentName}(...)}} (Error loading)`)];
        }
    }
}
 
const bring = new Bring();

document.addEventListener('DOMContentLoaded', () => {
    bring.renderComponents();
});
// addLibrary() function is used to add custom library list so that to include sspecific library by Library name using bring() functoin
bring.addLibrary('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css','link');
bring.addLibrary('bootstrapIcons','https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css','link');
bring.addLibrary('jq','https://code.jquery.com/jquery-3.6.0.min.js','script');
// brng.addLibrary('app','app.js','script');

// call bring() function to identify the Library name and assign its src link to either head or end of the doc before </body> tag
bring.bring('bootstrap','head');
bring.bring('bootstrapIcons','head');
bring.bring('jq','end');
// brng.bring('app','end');

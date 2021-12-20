/*
Copyright (c) 2021, Developers Club. All rights reserved.
version: 1.0.0
build: 1

# bring class perform an action of appending a link ot scrip to the either head or end of the DOM to use the libraries and reduces page loading time. 
# it is designed to make the web app faster to load and only bring the needed libraries to specific workplace instead of loading whole header file that make the webpage load very slow.
*/
class bring{    
    constructor(listOfLibraries){
        this.listOfLibraries = [];
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
}

var brng = new bring();

// addLibrary() function is used to add custom library list so that to include sspecific library by Library name using bring() functoin
brng.addLibrary('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css','link');
brng.addLibrary('bootstrapIcons','https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css','link');
brng.addLibrary('jq','https://code.jquery.com/jquery-3.6.0.min.js','script');
brng.addLibrary('apps','apps.js','script');
brng.addLibrary('pos_app','pos_app.js','script');

// call bring() function to identify the Library name and assign its src link to either head or end of the doc before </body> tag
brng.bring('bootstrap','head');
brng.bring('bootstrapIcons','head');
brng.bring('jq','end');
brng.bring('pos_app','end');
brng.bring('apps','end');

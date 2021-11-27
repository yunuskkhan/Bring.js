/*
Copyright (c) 2021, Developers Club. All rights reserved.
version: 1.0.0
build: 1

# bringAction class perform an action of appending a link ot scrip to the either head or end of the DOM to use the libraries and reduces page loading time. 
# it is designed to make the web app faster to load and only bring the needed libraries to specific workplace instead of loading whole header file that make the webpage load very slow.
*/
class bring{    
    constructor(listOfLibraries){
        this.listOfLibraries = [];
    }
    addLibrary(library,src){
        var data = {library:library,src:src};
        this.listOfLibraries.push(data);
    }
    bring(library,locatedIn){
        const head = document.querySelector('head');
        const end = document.getElementsByTagName('body')[0];
 
        this.listOfLibraries.forEach(element => {   
            if(element.library == library){
                if(locatedIn == 'head'){
                    head.innerHTML += element.src;
                }else{
                    end.innerHTML += element.src;
                }
            }
        });
    }  
}

var brng = new bring();

// addLibrary() function is used to add custom library list so that to include sspecific library by Library name using bring() functoin
brng.addLibrary('bootstrap','<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">');
brng.addLibrary('bootstrapIcons','<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">');
brng.addLibrary('jq','<script src="https://code.jquery.com/jquery-3.6.0.min.js" ></script>');

// call bring() function to identify the Library name and assign its src link to either head or end of the doc before </body> tag
brng.bring('bootstrap','head');
brng.bring('bootstrapIcons','head');
brng.bring('jq','end');

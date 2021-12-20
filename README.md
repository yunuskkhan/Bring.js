# Bring js 

Bring js is a javascript library to bring the required js scripts and links and place them into the head or footer to avoid slow browsing in the website.
 
# Documentation

-- Include the library

Include bring.js to your project at the end before the </body> tag
```coffee
 // Include here
 <script src="https://cdn.jsdelivr.net/gh/yunuskkhan/Bring.js@main/bring.js"></script>
</body>
```

-- Initialize

```coffee
  var brng = new bring();
```
Now we have function to add our links or scripts and we name it

```coffee
 // addLibrary() function is used to add custom library list so that to include sspecific library by Library name using bring() functoin
 // 1st argument is your script custom name 
 // 2nd argument is link of the script * you can write even local path in your project
 // 3rd argument is to define this script is either <link> or <script> where <link> will automatically adds rel='stylesheet' attribute to it
 brng.addLibrary('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css','link');
 brng.addLibrary('bootstrapIcons','https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css','link');
 brng.addLibrary('jq','https://code.jquery.com/jquery-3.6.0.min.js','script');
 brng.addLibrary('apps','apps.js','script');
 brng.addLibrary('pos_app','pos_app.js','script');
```
In the above step we have saved our list of the packages that we need for our project so we can call them on any page instead of loading whole bunch of libraries where we don't need them all 

-- Using Bring( )

Now we use bring function to place the script or link to our DOM or Head by specifying after the name of library which we defined it earlies in with addLibrary() function

```coffee
brng.bring('bootstrap','head');
brng.bring('bootstrapIcons','head');
brng.bring('jq','end');
brng.bring('pos_app','end');
brng.bring('apps','end');
```
Now you have succesfully added the libraries where you mentioned in the 2nd argument of the function bring which is Location of the script of link in the DOM or Head.

Thanks,

Regards,
Yunus Khan

Developers Club

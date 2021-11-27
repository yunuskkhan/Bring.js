# Bring js
Bring js is a javascript library to bring the required js scripts and links and place them into the head or footer to avoid slow browsing in the website.
 
# Documentation

-- Include the library

Include bring.js to your project at the end before the </body> tag
```coffee
 // Include here
 <script src="https://developersclubar.com/js/bring.js"></script>
</body>
```

-- Initialize

```coffee
  var brng = new bring();
```
Now we have function to add our links or scripts and we name it

```coffee
 // addLibrary() function is used to add custom library list so that to include sspecific library by Library name using bring() functoin
 brng.addLibrary('bootstrap','<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">');
 brng.addLibrary('bootstrapIcons','<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">');
 brng.addLibrary('jq','<script src="https://code.jquery.com/jquery-3.6.0.min.js" ></script>');
```
In the above step we have saved our list of the packages that we need for our project so we can call them on any page instead of loading whole bunch of libraries where we don't need them all 

-- Using Bring( )

Now we use bring function to place the script or link to our DOM or Head by specifying after the name of library which we defined it earlies in with addLibrary() function

```coffee
brng.bring('bootstrap','head');
brng.bring('bootstrapIcons','head');
brng.bring('jq','end');
```
Now you have succesfully added the libraries where you mentioned in the 2nd argument of the function bring which is Location of the script of link in the DOM or Head.

Thanks,

Regards,
Yunus Khan

Developers Club

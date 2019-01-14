/*
* $Id: InsideNYTimesBrowser.js 6759 2008-11-25 18:50:18Z santep $
* (c) The New York Times Company
*/
NYTD.require('/js/app/lib/prototype/1.6.0.2/prototype.js', function(){ NYTD.Moth.run(); });

NYTD.Moth = {

  run: function() {
    // make public

    Event.observe(window, 'load', function(){
      // bail out if there is an InsideNYTimesBrowser browser already 
      if (window.browser && (window.browser instanceof InsideNYTimesBrowser)) {return;}
      //init browser
      var count = $$('#insideNYTimesBrowser td:not([class="hidden"])').length;
      var browser = new InsideNYTimesBrowser("insideNYTimesBrowser", "leftArrow", "rightArrow", count, 1, "http://graphics8.nytimes.com/images/global/buttons/");
      browser.addAllItems('insideNYTimes', 'td');
      browser.showButtons();
    });
    
  }
  
};


var headerRow1Cell1 = null;
var bodyRow1Cell1 = null;   

/* class for individual slides */
function InsideNYTimesItem(url, imgUrl, headline, displayName, displayUrl, isPaid) {
 this.url = url;
 this.imgUrl = imgUrl;
 this.headline = headline;
 this.displayName = displayName;
 this.displayUrl = displayUrl;	
 this.isPaid = isPaid;
 this.parentBrowser = null;
}

/* class for the slide player */
function InsideNYTimesBrowser(elementId, leftArrowId, rightArrowId, displayItemsCount, scrollItemsCount, imgSrc) {
 this.elementId = elementId;
 this.leftArrowId = leftArrowId;
 this.rightArrowId = rightArrowId;
 this.displayItemsCount = displayItemsCount;		// total number of items to be displayed at one time
 this.scrollItemsCount = scrollItemsCount;		// how many items to scroll by when clicking next or previous
 this.itemArray = [];
 this.itemIndex = 0;
 this.imgSrc = imgSrc;
 this.leftImgOff = this.imgSrc + "moth_reverse_off.gif";
 this.leftImgOn = this.imgSrc + "moth_reverse.gif";
 this.rightImgOff = this.imgSrc + "moth_forward_off.gif";
 this.rightImgOn = this.imgSrc + "moth_forward.gif";
}

InsideNYTimesBrowser.prototype.showButtons = function() {
 if (document.createElement) {

   //begin left arrow
   var mothLeftArrow = document.getElementById(this.leftArrowId);
   //create image
   var isOff = (this.itemIndex === 0);
   var mothLeftArrowImg = document.createElement("IMG");
   var state = (isOff) ? this.leftImgOff : this.leftImgOn;
   mothLeftArrowImg.setAttribute("src", state);
   mothLeftArrowImg.setAttribute("name", "moth_reverse"); 

   //create anchor
   if (!isOff) {
     var mothLeftArrowAnchor = document.createElement("A");
     $(mothLeftArrowAnchor).observe('click', this.update.bind(this, 0));
     mothLeftArrowAnchor.appendChild(mothLeftArrowImg);
     mothLeftArrow.appendChild(mothLeftArrowAnchor);
   } else {
     mothLeftArrow.appendChild(mothLeftArrowImg);
   }
   //end left arrow

   //begin right arrow
   var mothRightArrow = document.getElementById(this.rightArrowId);
   //create image
   isOff = ((this.itemIndex + this.displayItemsCount) >= this.itemArray.length);
   var mothRightArrowImg = document.createElement("IMG");
   state = (isOff) ? this.rightImgOff : this.rightImgOn;
   mothRightArrowImg.setAttribute("src", state);
   mothRightArrowImg.setAttribute("name", "moth_forward"); 
   //create anchor
   if (!isOff) {	
     var mothRightArrowAnchor = document.createElement("A");
     $(mothRightArrowAnchor).observe('click', this.update.bind(this, 1));

     mothRightArrowAnchor.appendChild(mothRightArrowImg);
     mothRightArrow.appendChild(mothRightArrowAnchor);
   } else {
     mothRightArrow.appendChild(mothRightArrowImg);
   }	
   //end right arrow
 }
};

InsideNYTimesItem.prototype.write = function(firstCellIndex, currentCellIndex) {
 if (document.createElement) {
   var parentElement = document.getElementById(this.parentBrowser.elementId);
   if (parentElement.tagName == "TABLE" && bodyRow1Cell1) {
     var cloneBodyRow1Cell1 = bodyRow1Cell1.cloneNode(true);

     //if a header row exist
     if (headerRow1Cell1 !== null) {
       var cloneHeaderRow1Cell1 = headerRow1Cell1.cloneNode(true);

       if (cloneHeaderRow1Cell1.getElementsByTagName("A").length > 0) {
         var anchorObj = cloneHeaderRow1Cell1.getElementsByTagName("A")[0];

         if (this.displayUrl == "#") {
           anchorObj.parentNode.replaceChild(document.createTextNode(this.displayName), anchorObj);
         } else {
           $(anchorObj).setAttribute("href", this.displayUrl);

           if (this.isPaid) {
             var linkedObj = document.createElement("IMG");
             linkedObj.setAttribute("SRC", "http://graphics8.nytimes.com/images/headers/timesselect_header92x11.gif");
             anchorObj.firstChild.parentNode.replaceChild(linkedObj, anchorObj.firstChild);
           } else {
             // use innerHTML + html-encoded entity so that the ">>" displays correctly
             // on pages with iso-8859-1 *and* UTF-8 character encoding
             ent = document.createElement("DIV");
             ent.innerHTML = " &raquo;";
             anchorObj.firstChild && anchorObj.firstChild.parentNode.replaceChild(document.createTextNode(this.displayName + ent.innerHTML), anchorObj.firstChild);
           } 
         }
       } else {
         if (this.isPaid) {
           linkedObj = document.createElement("IMG");
           linkedObj.setAttribute("SRC", "http://graphics8.nytimes.com/images/headers/timesselect_header92x11.gif");
           cloneHeaderRow1Cell1.firstChild.parentNode.replaceChild(linkedObj, cloneHeaderRow1Cell1.firstChild);
         } else {
           var headerTitleObj = document.createElement(cloneHeaderRow1Cell1.firstChild.tagName);
           anchorObj = document.createElement("A");
           anchorObj.setAttribute("HREF", this.displayUrl);
           ent = document.createElement("DIV");
           ent.innerHTML = " &raquo;";
           anchorObj.appendChild(document.createTextNode(this.displayName + ent.innerHTML));
           headerTitleObj.appendChild(anchorObj);
           cloneHeaderRow1Cell1.firstChild.parentNode.replaceChild(headerTitleObj, cloneHeaderRow1Cell1.firstChild);
         }
       }
       this.parentBrowser.getHeaderRow().appendChild(cloneHeaderRow1Cell1);
     }

     //start body row
     if (firstCellIndex !== currentCellIndex) {
       if (cloneBodyRow1Cell1.getAttribute('class')) {
         cloneBodyRow1Cell1.removeAttribute('class');
       }
     }

     if (cloneBodyRow1Cell1.getElementsByTagName("A").length > 0) {
       if (headerRow1Cell1 === null) {
         var kickerLinkObj = cloneBodyRow1Cell1.getElementsByTagName("A")[0];
         if (this.displayUrl == "#") {
           kickerLinkObj.firstChild.parentNode.replaceChild(document.createTextNode(this.displayName), kickerLinkObj.firstChild);
         } else {
           $(kickerLinkObj).writeAttribute("href", this.displayUrl);

           if (this.isPaid) {
             linkedObj = document.createElement("IMG");
             linkedObj.setAttribute("SRC", "http://graphics8.nytimes.com/images/headers/timesselect_header92x11.gif");
             kickerLinkObj.firstChild.parentNode.replaceChild(linkedObj, kickerLinkObj.firstChild);
           } else {
             // use innerHTML + html-encoded entity so that the ">>" displays correctly
             // on pages with iso-8859-1 *and* UTF-8 character encoding
             ent = document.createElement("DIV");
             ent.innerHTML = " &raquo;";
             kickerLinkObj.firstChild.parentNode.replaceChild(document.createTextNode(this.displayName + ent.innerHTML), kickerLinkObj.firstChild);
           }
         }
       }

       var mothImgLinkObj = (headerRow1Cell1 === null) ? cloneBodyRow1Cell1.getElementsByTagName("A")[1] : cloneBodyRow1Cell1.getElementsByTagName("A")[0];
       $(mothImgLinkObj).writeAttribute("href", this.url);

       var headlineLinkObj = (headerRow1Cell1 === null) ? cloneBodyRow1Cell1.getElementsByTagName("A")[2] : cloneBodyRow1Cell1.getElementsByTagName("A")[1];
       $(headlineLinkObj).writeAttribute("href", this.url);
       if (this.isPaid) { headlineLinkObj.className = "select"; }

       // use innerHTML + html-encoded entity so that the ">>" displays correctly
       // on pages with iso-8859-1 *and* UTF-8 character encoding
       ent = document.createElement("DIV");
       ent.innerHTML = this.headline;
       if (headlineLinkObj.firstChild === null) {
         headlineLinkObj.appendChild(document.createTextNode(ent.innerHTML));
       } else {
         headlineLinkObj.firstChild.parentNode.replaceChild(document.createTextNode(ent.innerHTML), headlineLinkObj.firstChild);
       }
     }
     
     if (cloneBodyRow1Cell1.getElementsByTagName("IMG").length > 0) {
       var mothImgObj = cloneBodyRow1Cell1.getElementsByTagName("IMG")[0];
       $(mothImgObj).writeAttribute("src", this.imgUrl);
       $(mothImgObj).writeAttribute("alt", this.headline);
     }
     this.parentBrowser.getBodyRow().appendChild(cloneBodyRow1Cell1);	
   }
 }
};

InsideNYTimesBrowser.prototype.addItem = function(item) {
 if (item instanceof InsideNYTimesItem) {
   item.parentBrowser = this;
   this.itemArray.push(item);
 }
};

InsideNYTimesBrowser.prototype.update = function(doMoveRight) {
 //increment index count
 var origIndex = this.itemIndex;
 this.itemIndex = (doMoveRight) ? this.itemIndex + this.scrollItemsCount : this.itemIndex - this.scrollItemsCount;

 //set upper and lower bounds
 this.upperBound = this.itemArray.length - this.displayItemsCount;
 this.itemIndex = ((this.itemIndex + this.displayItemsCount) > this.itemArray.length) ? this.itemArray.length-this.displayItemsCount : this.itemIndex;
 this.itemIndex = (this.itemIndex < 0) ? 0 : this.itemIndex;

 //update button images
 this.deleteAllChildrenOf(document.getElementById(this.leftArrowId));
 this.deleteAllChildrenOf(document.getElementById(this.rightArrowId));
 this.showButtons();

 if (origIndex != this.itemIndex) {
   //get data for the first cell
   this.getFirstCell();

   //clear 
   if (headerRow1Cell1 !== null) {
     this.deleteAllChildrenOf(this.getHeaderRow());
   }
   this.deleteAllChildrenOf(this.getBodyRow());

   // re-populate
   for (var iUpdate=this.itemIndex ; iUpdate < (this.itemIndex + this.displayItemsCount) ; iUpdate++) {
     this.itemArray[iUpdate].write(this.itemIndex, iUpdate);
   }
 }
};

InsideNYTimesBrowser.prototype.getFirstCell = function() {
 if (document.getElementById(this.elementId).getElementsByTagName("THEAD").length > 0) {
   headerRow1Cell1 = this.getHeaderRow().cells[0];
 }

 if (document.getElementById(this.elementId).getElementsByTagName("TBODY").length > 0) {
   bodyRow1Cell1 = this.getBodyRow().cells[0];
 }
};

InsideNYTimesBrowser.prototype.getHeaderRow = function() {
 return document.getElementById(this.elementId).getElementsByTagName("THEAD")[0].getElementsByTagName("TR")[0];
};

InsideNYTimesBrowser.prototype.getBodyRow = function() {
 return document.getElementById(this.elementId).getElementsByTagName("TBODY")[0].getElementsByTagName("TR")[0];
};

InsideNYTimesBrowser.prototype.deleteAllChildrenOf = function(elementObj) {
 while (elementObj.hasChildNodes()) {
   elementObj.removeChild(elementObj.firstChild);
 }
};

InsideNYTimesBrowser.prototype.addAllItems = function(element, selector) {
 var hiddenElements = $(element).select(selector);
 for (var i = 0, hiddenElement; hiddenElement = hiddenElements[i]; i++) {    
   var kickerElement = hiddenElement.down('.kicker');
   var imageElement = hiddenElement.down('img') || hiddenElement.down('.img');
   var headlineElement = hiddenElement.down('.headline a');

   //Remove the last character if it is the right double angle bracket
   var displayName = kickerElement.textContent || kickerElement.innerText ;
   var sectionLength = displayName.length;
   if (displayName.charCodeAt(sectionLength-1) == 187) {
     displayName = displayName.substring(0, sectionLength-1);
   }
   
   var displayUrl = kickerElement.down('a') ? kickerElement.down('a').href : '#';
   var imgUrl = imageElement.readAttribute('src');
   var headline = headlineElement.innerHTML;
   var url = headlineElement.href;

   this.addItem(new InsideNYTimesItem(url, imgUrl, headline, displayName, displayUrl, false));
 }
};
/**
* $Id: articleCommentCounts.js 13442 2008-08-21 19:14:24Z abehrens $
* 
* The Purpose of this code is to sniff out tags which have particular classes, and an attribute called "articleid".
* Once found, the tag's content is filled with links to comment pages, or just the number of comments.
* 
* EX. <span class="commentCountText" articleid="23423404020"></span>
*     Produces a full link to the comment page, eg. <a href="blah">Read Comments (32)</a>
* 
* EX. <span class="commentCountLink" articleid="29282992101"></span>
*     Produces just the number of comments, eg. (21)
* 
* It is assumed:
*   1. The page contains a JSON object called NYTArticleCommentCounts
*   2. The articleid attribute is a valid Knews ID, and matching data is contained in NYTArticleCommentCounts
*   3. AFTER NYTArticleCommentCounts is loaded, a line of javascript is called. This line is:
*      ArticleCommentCounts.apply();
* 
* Note to self: Some of this would go nicely in a library.
* 
*/

ArticleCommentCounts = (function() {
	var that = {};
	
	// Call this externally to apply changes
	that.apply = function() {
		getLinkFields().each(addLink);
		getCountFields().each(addCount);
	};
	
	// Retrievers
	
	function getCountFields() {
		return $$(".commentCountText");
	}
	
	function getLinkFields() {
		return $$(".commentCountLink");
	}
	
	// Builders
	
	function addLink(node) {
		var articleId = getArticleId(node);
		if (nodeIsBlank(node)) {
			if (commentInfoExistsFor(articleId)) {
				addContent(node, getPostCommentLink);
				addContent(node, getDivider);
				addContent(node, getReadAllCommentsLink);
			} else if (hasOverflowUrlInAttribute(node)) {
				addContent(node, getBailOutPostCommentLink);
			}
		}
	}
	
	function addCount(node) {
		if (nodeIsBlank(node)) {
			addContent(node, getCountNode);
		}
	}
	
	// Dom Node Generators
	
	function getPostCommentLink(data, node) {
		return (data.commentsEnabled) ? link(getOverflowUrl(node)+"#postComment", "Post a Comment") : emptyNode();
	}
	
	function getBailOutPostCommentLink(data, node) {
		return link(getOverflowUrl(node)+"#postComment", "Post a Comment");
	}
	
	function getReadCommentsLinkText(data) {
		return (data.commentsEnabled) ? "Read " : "Read Comments " ;
	}
	
	function getReadAllCommentsLink(data, node) {
		return hasComments(data) ? link(getOverflowUrl(node), getReadCommentsLinkText(data) + getCountText(data)) : emptyNode();
	}
	
	function getDivider(data) {
		return (data.commentsEnabled && hasComments(data)) ? document.createTextNode(" | ") : emptyNode();
	}
	
	function getCountNode(data) {
		return document.createTextNode(getCountText(data));
	}
	
	// Utilities
	
	function getArticleId(node) {
		return node.getAttribute("articleid").strip();
	}
	
	function getCommentData(articleId) {
		if (commentInfoExistsFor(articleId)) {
			return NYTArticleCommentCounts[articleId]
		}
	}
	
	function commentInfoExistsFor(articleId) {
		return (articleId && NYTArticleCommentCounts && NYTArticleCommentCounts[articleId]);
	}
	
	function hasOverflowUrlInAttribute(node) {
		return !!node.getAttribute("overflowurl");
	}
	
	function getOverflowUrl(node) {
		return node.getAttribute("overflowurl")
	}
	
	function getCountText(data) {
		return hasComments(data) ? "("+data.count+")" : "";
	}
	
	function addContent(parent, childBuilder) {
		var articleId = getArticleId(parent);
		parent.appendChild(childBuilder(getCommentData(articleId), parent));
	}
	
	function hasComments(data) {
		return typeof data != "undefined" && typeof data.count != "undefined" && data.count > 0;
	}
	
	function nodeIsBlank(node) {
		return (node.innerHTML == "");
	}
	
	function link(url, text) {
		return new Element("a", {href: url}).update(text);
	}
	
	function emptyNode() {
		return document.createTextNode("");
	}
	
	return that;
})();
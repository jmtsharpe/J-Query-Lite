(function () {
    var functions = [];
    var flag = false;
    document.addEventListener("DOMContentLoaded", function() {
      flag = true;
      functions.forEach(function (fun) {
        fun();
      });
    });
    window.$l = window.$l || function (selector) {
    if (typeof selector === "function") {
      if (flag) {
        selector();
      } else {
      functions.push(selector);
      }
      return ;
    }

    if (selector instanceof HTMLElement) {
      return new DOMNodeCollection(selector);
    }

    var elementList = document.querySelectorAll(selector);
    NodeList = [].slice.call(elementList);
    return new DOMNodeCollection(NodeList);
  };

  var DOMNodeCollection = function (elements) {
    this.htmlElements = elements;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (string === undefined) {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach (function (el) {
        el.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html('');
  };

  DOMNodeCollection.prototype.append = function (string) {

    if (string === undefined) {
      return this.htmlElements[0].innerHTML;

    } else {
      this.htmlElements.forEach (function (el) {
        el.innerHTML += string;
      });
    }
  };

  DOMNodeCollection.prototype.attr = function (key, value) {
    if (value === undefined) {
    return this.htmlElements[0].getAttribute(key);
    }
    this.htmlElements[0].setAttribute(key, value);
  };
  //
  // DOMNodeCollection.prototype.addClass = function (name) {
  //   var newName = this.htmlElements[0].getAttribute("class") + " " + name;
  //   this.htmlElements[0].setAttribute("class", newName);
  // };

  DOMNodeCollection.prototype.addClass = function (name) {
     this.htmlElements[0].classList.add(name);
  };

  DOMNodeCollection.prototype.removeClass = function (name) {
    this.htmlElements[0].classList.remove(name);
  };

  DOMNodeCollection.prototype.children = function () {
    var output = [];
    this.htmlElements.forEach(function (el) {
      var children = [].slice.call(el.children);
      output = output.concat(children);
    });
    return new DOMNodeCollection(output);
  };

  DOMNodeCollection.prototype.find = function (target) {
    var output = [];
    this.htmlElements.forEach(function (el) {
      var temp = [].slice.call(el.querySelectorAll(target));
      output = output.concat(temp);
    });
    return new DOMNodeCollection(output);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.htmlElements.forEach(function (el) {
      el.remove();
    });
  };

  DOMNodeCollection.prototype.on = function (event, fun) {
    this.htmlElements.forEach(function (el) {
      el.addEventListener(event, fun);
    });

  };

}(this));

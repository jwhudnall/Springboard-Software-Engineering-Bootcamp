/*
Part One: Solidify Terminology
In your own terms, define the following terms:

What is HTTP?
  - The protocol used to receive and serve resources on the world wide web.

What is a URL?
  - A uniform resource locator - an address for an internet resource. Broken into different components such as
    protocol, hostname, resource and any queries.

What is DNS?
  - The protocol that translates text-based web addresses to their corresponding IP addresses. "Phonebook" for the Internet.

What is a query string?
  - Additional parameters passed to a server as part of the request.

What are two HTTP verbs and how are they different?
  - GET and POST. GET requests have no server side effects, whereas POST requests affect some characteristic on the server.

What is an HTTP request?
  - The submission of a URL to the intended IP destination. Text is converted to IP address via DNS lookup, if not already cached.
    Uses TCP-IP handshake - Syn => Syn-Ack =? Ack to establish a connection.

What is an HTTP response?
  - The response received from the server at the specified address.

What is an HTTP header? Give a couple examples of request and response headers you have seen.
  - Additional parameters either passed or received as part of a HTTP request.
     - Accept: Application/JSON
     - Accept Language: en

What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
  - A GET request is sent. The browser checks to see if the site is cached in your cache. If not, the request goes to the Router,
    then to the ISP and to a DNS server (lookup table). The DNS returns the corresponding IP address that relates to the resource,
    which circles back to your browser. The request is received.
*/

// Part Two: Practice Tools
// 1. Using curl, make a GET request to the icanhazdadjoke.com API to find all jokes involving the word “pirate”
curl -H "Accept: application/json" "https://icanhazdadjoke.com/search?term=pirate"

// 2.Use dig to find what the IP address is for icanhazdadjoke.com
// 104.21.37.176 & 172.67.211.64

// 3.Make a simple web page and serve it using python3 -m http.server. Visit the page in a browser.
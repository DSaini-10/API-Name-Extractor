# API-Name-Extractor

### Steps to Run the Code:- 
Simple JS Program for extracting suggested names through a web API having root at : 35.200.185.69

To Run the program one simply needs to have node installed in his/her system.\
-> Just fork the repository in your local machine.\
-> Run npm int-y in the code repository\
-> Run the main "name_extractor.js" file using node (as "node name_extractor")

### Logic for the Code:- 

The extractAllNames() is the main function of the program which ensures to make requests both for possible single letter combinations and double letter combinations out of the 
given query string, for which fetchNames() function is repeatedly called. This function makes asynchronous GET requests on to the specified endpoints of the given API.

If a successful and desired response is received corresponding to our request then we add the suggested names to uniqueNames set(set is used in order to store only unique names).
Otherwise if the server replies back with status 429 then it means that we have hit our rate limit and need to wait for some time before making new requests. So we use the concept of exponential backoff(although we simply use delay *2 instead of random values within a given range) before making new requests.

If the request fails due to any reason then we log out the error code received in the response.
However if we are unable to connect with the server to even make a GET request then this case is handled by the catch block.

Later on while testing, I felt the need to also time the requests so there is also a timer code attached which helps to time the programs execution in order to correctly select the delay value based on some hit and trial.

### API Exploration :- 
Through the process of extensive testing of given RESTful API. I was able to draw out the following conclusions:- 

1. The api has specific endpoint for specific version of the name suggestions
\
v1 -- suggests name containing only alphabets\
v2 -- suggests alphanumeric names\
v3 -- suggests alphanumeric names having whitespaces and special symbols

2. The query is accepted even if it is alphanumeric with whitespaces and special symbols in all of the versions 
but it returns valid output only if input conforms with the return type of that version.

3. The maximum query length across different versions which gives unique results is :
\
v1 -- 2\
v2 -- 2\
v3 -- 2

4. The API has a rate limit hence under excessive load the api returns an HTTP 429 as reply.
   Rate limit for v1 -- 100 Requests/min
   Rate limit for v2 -- 50 Requests/min
   Rate limit for v1 -- 80 Requests/min

6. The number of suggested names returned by API's different versions are as follows :-

When query length is one :
\
v1 -- (10)\
v2 -- (12)\
v3 -- (15)

When query length is two :
\
v1 -- (10)\
v2 -- (2-12)\
v3 -- (3-15)


# Any suggestions or improvements in the code are most welcome !!

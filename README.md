# API-Name-Extractor

### Steps to Run the Code:- 
Simple JS Program for extracting suggested names through a web API having root at : 35.200.185.69

To Run the program one simply needs to have node installed in his/her system.
-> Just fork the repository in your local machine.
-> Run npm int-y in the code repository
-> Run the main "name_extractor.js" file using node (as "node name_extractor")

### Logic for the Code:- 

### API Exploration :- 
Through the process of extensive testing of given RESTful API. I was able to draw out the following conclusions:- 

1. The api has specific endpoint for specific version of the name suggestions

v1 -- suggests name containing only alphabets
v2 -- suggests alphanumeric names
v3 -- suggests alphanumeric names having whitespaces and special symbols

2. The query is accepted even if it is alphanumeric with whitespaces and special symbols in all of the versions 
but it returns valid output only if input conforms with the return type of that version.

3. The query length is across different versions which gives unique results is :

v1 -- 2
v2 -- 2
v3 -- 2

4. The API has a rate limit hence under excessive load the api returns an HTTP 429 as reply.

5. The number of suggested names returned by API's different versions are as follows :-

When query length is one :

v1 -- (10)
v2 -- (12)
v3 -- (15)

When query length is two :

v1 -- (10)
v2 -- (2-12)
v3 -- (3-15)


# Any suggestions or improvements in the code are most welcome !!

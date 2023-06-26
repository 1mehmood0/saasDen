# saasDen

Run the app on <http://168.62.220.216:9020/login>

SETUP:-       
  * Local Setup:-                        
    1)- Add Environment variable in .env file.                            
    2)- Clone the Repository                
    3)- ```cd saasDen```              
    4)- ```npm install```            
    5)- ```npm start```            

  * Docker Setup:-            
    1)- Clone the Repository          
    2)- Add Respective Environment Variables in Dockerfile.        
    3)- In terminal  ```docker build . -t saasden-mehmood```        
    4)- ```docker run -p 9020:9020 -d saasden-mehmood```        
    5)- Acces on ```localhost:9020/login```          




            
* For the stats API-
    * ```/user/stats?type=userPerProvider```
    * This will display the number of user per identitiy provider.(ik it should be post)
  

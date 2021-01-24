<h1 align="center">JWT Auth</h1>
<p align="center">Just a learning application</p>

<br/>
<p>This application was created just to learn how to use jwt with rs256.</p>
<h2>Getting Started</h2>

- <p>Clone this repository</p>
  
  ```sh
  git clone https://github.com/pereiraadiel/jwt-auth

  cd jwt-auth
  ```
- <p>Install all dependencies</p>

  ```sh
  yarn
  cd client
  yarn

  # or

  npm i
  cd client
  npm i
  ```

- <p>Prepare the environment</p>
  
  - copy the .env.example file to a new .env.dev file at the root of the project and fill it in with your postgres database access credentials

  - add your sendgrid api key to the .env.dev file.

  - generate your own RSA keys

    ```sh
      openssl genrsa -out private-key.pem 2048 
      
      openssl rsa -in private-key.pem -pubout -out public-key.pem
    ```
  - copy your new RSA keys to the .env.dev file replacing all line breaks with the '\n' character, as in this example:
    
    ```c
      "-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEA3POpb9/1PwBK9A3vBfXXTJuGhTMy8CreeFXEM19/WB6bLqhI\nXE7IzH40KNnfWnQn1twMshViJBN9eHAiYErnF5dJrzjWtIp9xrFhmquYvz/2RyeV\nflWXH/ZmfO1v15nF7tKjN3+WTM4rAY9wGsslGahvs6ET0rp2PG0PLJXXEvYNxHp1\nOpP21xrWepb3RXCxlCqARq//UNENgFyazpsx9Q/V15xvlmUT74mYOGMMEhy/Xw71\nSEMr/rOElXj2cGZ65fgeBl+vi7Fj/0Z7jk23Ka4iuaXxElys8cieok77KJrhwFoR\nae4cJgjY86SfYgipc5PwepOtu1S5k3NRtIEVAQIDAQABAoIBAQDDAkM/PFkF28pL\nkKiviAUX1gRqN3/zvMJRTtE1zklkis7H5TrITbin05NRosmg2ff3iIuj+X9++7y3\nubB9cF550cr03aOSANF1tkTA8EaGNXu13VfyArS5Pw3BoQYfMdciK8JmTzNmYmhO\nnjyBSV5bQPAliDsot+1284J7BVynm+Mq+cT+ZrzQ9O1LxW8jRAaQWHWaAEscNRB5\n+F5huHZzTqnxHzv5KyU4fM4h6YTEs9jGSbRZ+sMh2f7fcod6eNmV0eqdiMhsrf3h\nmAnen8VAdzNbc272Y7SkMqVZnIeiN7BmB/CiWNqCXN8DIREq4kp6IWg0xcO3qSxr\nZu7QqzRhAoGBAPMjKnEJ71MvRjMRPagVsZ00RLl1J0i4ddQTr79iXzbTTfS0je5I\nXb/ibBbHSw5ScNopS6mo1x5QG36Q67KAcURoexjOjXEusE+pfODxrihxprlxMooo\ntp8dPdE+wbN/DbFSwzZKswfJdYnN3pUQ1godDcRHzM9stJ5F2jdJ/xz1AoGBAOik\nCOSiCNpTNaJWXhpY/XwdaG2OUI/gJtZBHL21DbHXP2ZdZJwNh7q3AXy9BCtTPETV\nlkgcKgYRG7dERNz81ev9xzspqUTvAtssM9y0WzSJZW0Kxwo1qgGUdYQWOVVw6909\ntX0dnPm9OtkZ7f7dAP5nQ2BQ/OEZE9ni8mFmS1BdAoGBAKjkAJNM52XNLOJEU6Py\njdI5gJOjAYrON2r90dMLrkATP89/rCedNSIZUiPwg/6K3cFtdhWAJw3zb2XXnSH9\nfrCaMwfkUvQQDoEHpqtKtkN5zup56zV1WoXkdhBnm33n/8bxSpDoCryaAH+c9cRu\nUX/s9qcliOt9A2n987r8N64RAoGBAKaE85Cjou6TbOqcI5N8a0Sx0BPLMEMr0OC/\njpEDzZ+kUM82vlMtJCAz6i6dJSTV2Wfz8jP/ZN0e1dXiWeBMYdsftcHVWkHrSwIS\nq7SorDf4uM7KThoyu1OSLmOzfKp5v3qHNyctUTU5i6vmcYJiMtnmlEWW8ss0pg7p\n8VBiZjpJAoGAGx45CeXakGjzCmGCGzenMOj1WDHweOHlletdqgqQMmHrbVdUUCiK\nl/B2AhV7k67z9OB6C8KGlEks/Jp3Qo429JCcJS8wIKtUNoXp9oApdcuo2ks7pxda\no5N3LZFWr1C5HWRcmQf3UdLtK6zwul+m7Qni8+ZUi2TZ+3P6hld+rdw=\n-----END RSA PRIVATE KEY-----\n"
    ```
  
- <p>Start the server</p>

  ```sh
  cd ..
  yarn dev

  # or

  cd ..
  npm run dev
  ```
- <p>Start the frontend</p>

  ```sh
    cd client
    yarn start

    # or

    cd client
    npm run start
    ```
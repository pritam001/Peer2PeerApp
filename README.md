Peer to Peer Review and Kudos Platform
======================================



### `Problem Statement :`
To have ability for employee or manager to raise peer to peer review feedback request and manager gets feedbacks in the space to have effective quarterly and annual reviews with the employee. To have Kudos platform for employees.


### `Use Cases :`
- [Employee]() : I as a resource working with 6-10 peers in a quarterly basis would like to send feedback request about me to my peers Login with google login of xyz.com domain in the app. The feedback request can be a page where an employee can choose set of employees through google login search and add them to their list and after selecting set of employees they can raise feedback request on click of a button. Now the list of peer feedback request goes to Manager for approval. A Manager can add or remove peers in the list. 
- [Peer]() : Now all the peers should get an email with a link, where on click, will ask peer to login to the app and share feedback. He/she may have a list of pending feedbacks to complete. On feedback shared by a peer, the feedback is only sent to manager over email and also viewable via app. 
- [Bots]() : A periodic job should check for pending feedback request and sent mail to respective folks to share feedback and it pending for x days as a body content with the link to share feedback on a weekly 3 days once basis from the time of feedback request shared.
- [Manager]() : A Manager on login, should find list of approvals pending, list of feedbacks received per employee, where an employee can also be searched to get only his feedback. Feedbacks received should be listed in a group stack by quarterly on the view for a manager, hence a same peer can give feedback every quarter on request. 
- [Feature]() :  Kudos Ability to choose any one employee in the system through google account and send a kudos with a 160 character restricted message, where the message goes to person from who you send across and also to his/her manger. Weekly one mailer to an employee should go with kudos given to others and kudos received from others Manager should get consolidated weekly kudos given by his team/received by his team through the same app.

### `Tech Stack:`
| Tech | Details | Installation |
| ----- | ----- | ----- |
| Spring Boot | Spring Boot is Spring's convention-over-configuration solution for creating stand-alone, production-grade Spring-based Applications | https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html
| Maven | Apache Maven is a software project management and comprehension tool
| MongoDB | MongoDB is an open-source document database and leading NoSQL database | https://docs.mongodb.com/v3.0/installation/
| ReactJS | React is front end library developed by Facebook. It's used for handling view layer for web and mobile apps | https://facebook.github.io/react/docs/installation.html
| ReactDOM | React DOM takes care of updating the DOM to match the React elements. |
| jQuery and jQuery AJAX | jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. | https://www.w3schools.com/jquery/jquery_get_started.asp
| Toastr | toastr is a Javascript library for non-blocking notifications. jQuery is required. | https://github.com/CodeSeven/toastr
| Bootstrap 3 | Bootstrap, a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development. | http://getbootstrap.com/getting-started/
| MDL | A front-end template that helps you build fast, modern mobile web apps. | https://getmdl.io/started/index.html


### `Usage Instructions:`
1. Download and install [Spring Tool Suite](https://spring.io/tools/sts/all) 
2. Download https://github.com/pritam001/Peer2PeerApp/ and save it locally.
3. Install MongoDB, run ``$ mongod`` and create a database (for e.g. "medlife_p2p") and edit the `src/main/resources/application.properties` file to connect to Mongo database.
>
> #application.properties
> #mongodb
> spring.data.mongodb.host=localhost
> spring.data.mongodb.port=27017
> spring.data.mongodb.database=medlife_p2p
>

```sh
$ mongo
MongoDB shell version v3.4.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.4
> show dbs
admin        0.078GB
local        0.078GB
> use medlife_p2p
switched to db medlife_p2p
```

4. Open Peer2PeerApp folder using Spring Tool Suite using *"Import Maven Project"* option.
5. [Create a Google API Console project and client ID](https://developers.google.com/identity/sign-in/web/devconsole-project). Add Client ID and Client Secret to `src/main/resources/application.yml` file for Google authentication. Alternatively, remove the `application.yml` file and `ApplicationSecurity.java` to remove authentication.

> #indentation matters!
> security:
>    oauth2:
>        client:
>            clientId: your-client-id.apps.googleusercontent.com
>            clientSecret: your-client-secret
>            accessTokenUri: https://www.googleapis.com/oauth2/v3/token
>            userAuthorizationUri: https://accounts.google.com/o/oauth2/auth
>            tokenName: oauth_token
>            authenticationScheme: query
>            clientAuthenticationScheme: form
>            scope: profile
>        resource:
>            userInfoUri: https://www.googleapis.com/userinfo/v2/me
>            preferTokenInfo: false
> 

6. Run `ApplicationStarter.java` as Java Application in Spring Tool Suite.
7. Open http://localhost:8080/cookielogin/ to start application.



Peer to peer review & Kudos platform
 
Problem
 
To have ability for employee or manager to raise peer to peer review feedback request and manager gets feedbacks in the space to have effective quarterly and annual reviews with the employee. Good to have Kudos platform for employees.
 
 Flow / Use cases
 
Employee : I as a resource working with 6-10 peers in a quarterly basis would like to send feedback request about me to my peers
Login with google login of medlife.com domain in the app.
The feedback request can be a page where an employee can choose set of employees through medlife google login search and add them to their list and after selecting set of employees they can raise feedback request on click of a button.
Now the list of peer feedback request goes to Manager for approval.
A Manager can add or remove peers in the list.
Now all the peers should get an email with a link, where on click, will ask peer to login to the app and share feedback. He/she may have a list of pending feedbacks to complete.
On feedback shared by a peer, the feedback is only sent to manager over email and also viewable via app.
A periodic job should check for pending feedback request and sent mail to respective folks to share feedback and it pending for x days as a body content with the link to share feedback on a weekly 3 days once basis from the time of feedback request shared.
A Manager on login, should find list of approvals pending, list of feedbacks received per employee, where an employee can also be searched to get only his feedback. 
Feedbacks received should be listed in a group stack by quarterly on the view for a manager, hence a same peer can give feedback every quarter on request.
On successful completion of above, good to have feature - Kudos
Ability to choose any one employee in the system through google account and send a kudos with a 160 character restricted message, where the message goes to person from who you send across and also to his/her manger.
Weekly one mailer to an employee should go with kudos given to others and kudos received from others
Manager should get consolidated weekly kudos given by his team/received by his team through the same app
 
 
 
 
Design and Implementation Requirements
 
The design should be object-oriented and should be able to accommodate changes at any point. It should also be extensible and modularized so that the logic built can be used in other projects like annual appraisal, moderated patient doctor feedback. 
 
Following tech stack has to be used for this project:
 
Backend APIs: Spring Boot and maven based project, Java - Key methods to have unit testing.
Front-end UX: HTML/CSS/Javascript, ReactJS, React DOM, Fetch for rest apis, Cordova for android, ios, windows os, mac os versions (No Jquery)
Database: MongoDB 
Repo through Gitlab
Frontend app should be bundle using cordova for all the 4 device stacks.

# React Authentication
### We will cover:
- How user authentication works behind the scenes!
- Build an auth server with Node js.
- How to verify user's email addresses and reset passwords.
- How to keep users data such as passwords and personal information safe.

### Before starting one should must have the basic knowledge of 
- React (components, hooks, and routing) [[Day-8_learning-React| Learn about these thing]]
- Node.js (with Express) [[Day-9_Learning-React| More about Express js]]
- MongoDB [[Day-10_Learning-React|Learn more]]
- Full-stack development basics.

### Two Main Goals
1. Understand and apply authentication fundamentals with full-stack React.
2. Develop a full-stack authentication template.

### Course Structure:
1. Fundamentals of user authentication.
2. Project setup.
3. Add user authentication to full-stack MERN app.
	- Signing up
	- Logging in and out
	- Creating private routes
	- Using JSON Web Tokens (JWTs)
4. Email Verification.
5. Resetting Passwords.
6. OAuth integration (that is, "Log in with Google")
7. using prebuilt authentication providers.
8. Authentication best practices (don't skip this one) [**Important**]

## Lets get started !!
User authentication is Verifying that our application's users are who they say they are. 
Types of user authentication:
### - Knowledhe-Based Authentication
	- A password
	- A PIN
	- Security Question
### - Ownership-Based Authentication : 
  Verifying user's identities based on whether or not they have something:
 - An email address, (sent or verify link on these email)
 - A mobile phone, (sent on the mobile phones)
 - An OTP fob or app, (time limit opt sent to our SIM)
### - Two-Factor Authentication :
Because knowledge based and ownership based authentication both have their potential vulneriblities most people recommend two-factor authentication which usuallly requres an combination of knowledege and ownership.
In other words you have to know Nikesh Uprety password and have access to his phone, which generally makes it a lot harder to impersonate Nikesh Uprety. 
### - Biological-Based Authentication
Verifying user's identities based on hard-to-fake biological characteristics.
- Facial recognition
- Fingerprint readers
- Eye scans


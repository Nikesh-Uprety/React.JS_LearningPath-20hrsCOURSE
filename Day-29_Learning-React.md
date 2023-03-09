# Best Practices in React Authentication
## 1. Using HTTPS, SSL and TLS.
- SSl stands for secure sockets layer and TLS is transport layer security.
-
### How HTTPS, SSL, and TLS works
- We register our site with a certificate authority.
- The authority gives us an SSL certificate we can use to verofy our identoty.
- /These certificates are usually free nowadays (That is, from Lets Encrypt) and provided by default on many web hosts.
## 2. Salting and Peppering Passwords
### Salting
Generating a random strings for each user and combining that with their password before hasing
```bash
asasasdssc + myP@SSw0rD!
		   |
asasasdsscmyP@SSw0rD!
	       |
(Generate a hash from this )
```
### Peppering
This is the same thing as salting, except the random "pepper" string is the same for all users and not store in the database/
This is usually combined with salting.
## 3. Never Trust the Front End
When implementing some kind of security measure, it must be implemneted on the server.
It should never rely solely on client-side logic.
Some Examples
- Make sure users can only view their own data.
- Make sure users can't store arbitrary fields in our database
- Make sure only paid subscribers can access certain content.

IMPLEMENT ALL OF THESE ON THE BACK END.
## 4. Handle Authentication Errors Correctly
##### Inform users of Authentication Errors
<hr style="border:1px solid black;">
<p style="color:red">If something goes wrong, let the user know.</p>

##### Don't Tell Them Too Much
<hr style="border:1px solid black;">
<p style="color:red">There are certain things that we don't want our users to know too much about</p>
<p style="color:orange">"Account alreaddy exists"</p>
<p style="color:orange">"Could not connect to MongoDB at 123.45.67.89"</p>
<p style="color:orange">"Error comparing hashes 'asfrfrtgdsfv' and 'lijfjhuh57487hf'"</p>

### Our Goal with Errors
Find a balance between maximizing user experience and maximizing safety.
## 5. Secure Your Database
- Hosting your database somewhere means "exposing it to the elements"
- Most database providers will alreaddy have a basic security setup.
- The default for MongoDB community Edition is to have most forms of security disabled; make sure to folloe their instructions to enable it.

### The Lesson
Regardless of what database you use, follow all the security setup instructions before releasing.

# What We Learned 
- How to add basic JWT authentication.
- How to verify emails.
- How to reset passwords.
- How to incorporate OAuth.
- How to use third-party authentication providers.
- Best practice.
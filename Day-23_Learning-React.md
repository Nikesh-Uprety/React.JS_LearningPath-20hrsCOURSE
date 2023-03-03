# JSON Web Tokens (JWTs)
Strings that we give to users when they authenticate.
Can be used instead of the user's password to interact with protected server resources.

## What DO JWTs Look Like?
       Header               Payload                 Signature
hufhHIHjiowi9ewio.fhjuUHJhhjfiuUQPOlannxaoe.uipffrjAKoepw 
This is encoded in base64

## How JWTs are used in Full-Stack Apps.
- Step 1: The user logs in.
- Step 2: The server generates a JWT containing the user's information.
- Step 3: The server sends the JWT to the user.
- Step 4: The front end stores this JWT.
- Step 5: The front end includes this JWt whenever it needs privileged access.
- Step 6: The server uses the JWT's signature to verify that it hasn't been modified.

## Benefits of JWTs
- JWTs are stateless.
- Use JSON, which is more compact and secure than using XML.
## Drawbacks of JWTs
- Tokens are valid until they expire or until the private key is changed.
- The user will have to reauthenticate when the token expires.

# Adding a sign-up route to the server
- We create and route `singuprouter` and then installed few libraries.
- First one is `npm install bcrypt`
	- This will encrypt the users password before we send the data into the database.
- Next one is `dotenv` which load the files from the environment variables.
- Last one is `jsonwebtoken` : This is package for signing and verifying tokens.
- `npm instal bbcrypt dotenv jsonwebtoken`


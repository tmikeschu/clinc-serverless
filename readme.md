# Serverless Clinc Business Logic Handler

Create an AWS user.

```
brew install awscli
aws configure
```

Enter id and key.

```
npm install -g serverless
sls deploy
```

For subsequent updates:

```
sls deploy -f clincQuery
```

Logging:

```
sls logs -f clincQuery -t
```

Testing:

```
npm test
```

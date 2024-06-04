const {username,password,hostname,databasename} = process.env;
export const connectionStr = "mongodb://"+username+":"+password+"@"+hostname+":27017/"+databasename+"";
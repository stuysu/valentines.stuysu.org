import pymongo
import csv
import time

clientstring = input("Mongo Client URL (including username & password): ");

client = pymongo.MongoClient(clientstring);
db = client["valentines-messages"];
collection = db["users"];

csvinputname = input("CSV file of users taken from StuyActivities DB: ");

with open(csvinputname, newline='') as csvfile:
    userreader = csv.reader(csvfile)
    i = 0;
    for row in userreader:
        if(i % 100 == 0):
            print("Processed {} entries".format(i));
        if(row[3] == "email"):
            # this is the header row
            print("Skipping header row");
            pass;
        else:
            query = {"email": row[3]};
            userobj = collection.find_one(query);
            if(not userobj):
                # add new user
                print("Email {} not found".format(row[3]));
                newobj = {"firstName": row[1], "lastName": row[2], "email": row[3], "gradYear": row[4]}
                collection.insert_one(newobj);
        i += 1;


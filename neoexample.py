from py2neo import Graph, Node, Relationship
from neo4j import GraphDatabase 
import pandas as pd
from pandas import DataFrame

i=1
print ("Enter name")
mail=input()
graph = Graph(password="Temp")
array1= []
ar_id=[]
while i !='0':
    print("1. To view your list")
    print("2. To view Finished list")
    print("3. To read new book")
    choice1=input()
    if choice1 == '1':
        j=0
        
        tx = graph.run('''Match (:Person{Name:"'''+mail+'''"})-[R:READING]->(b:Book) return b.Title as Title'''  ).to_data_frame()
        for j in tx['Title'].values:
          array1.append(j)
      
        for x in array1:
            print("x"+x) 
    
    elif choice1 =='2':
        
        tx = graph.run('''Match (:Person{Name:"'''+mail+'''"})-[R:FINISHED_READING]->(b:Book) return b.Title as Title'''  ).to_data_frame()
        for j in tx['Title'].values:
          array1.append(j)
        cnt=1
        for x in array1:
            print(str(cnt)+". "+x)
            cnt=cnt+1 
        wait=input()
    elif choice1 =='3':
        tx = graph.run('''Match (b:Book) return b.Title as Title, ID(b) as ID LIMIT 5'''  ).to_data_frame()
        for j in tx['Title'].values:
              print(j)
        for j in tx['ID'].values:
              ar_id.append(j)

        num= int(input("Select book number"))
        print("Book content will be  here..............")
        print("1. to comment ")
        print("2. Review ")
    elif choice1 == '0':
        break;

    else:
        print("wrong choice")
       
#cypher query
#tx = graph.run('''Match (p:Person) return p.Name as Name'''  ).to_data_frame()

#use .data() upside when want to count relarionships number 
#down below for loop is  to get all data one by one
#for i in tx['Name'].values:
#imported panda liabrary and storing value in data frame formate 
  

#getting value of only single record 
#tx=tx['Name'].values[0]
#tx2 = graph.run('''Match (p:Person {Name:"'''+str(tx)+'''"} ) return p.Name as Name''' ).data()
#print(tx2)

tx3 = graph.run('''Match (p:Person{Name:"Kishan"})-[R:READING]->(B:Book{Title:"Titanic"}) Return p.Name, B.Title ''').data()
if tx3 ==[]:
    print("No record")
else:
    print(tx3)
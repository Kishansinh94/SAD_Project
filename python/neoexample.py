from py2neo import Graph, Node, Relationship
from neo4j import GraphDatabase 
import pandas as pd
from pandas import DataFrame

graph = Graph(password="Temp")
#cypher query
tx = graph.run('''Match (p:Person) return p.Name as Name'''  ).to_data_frame()

#use .data() upside when want to count relarionships number 
#down below for loop is  to get all data one by one
#for i in tx['Name'].values:
#imported panda liabrary and storing value in data frame formate 
  

#getting value of only single record 
tx=tx['Name'].values[0]
tx2 = graph.run('''Match (p:Person {Name:"'''+str(tx)+'''"} ) return p.Name as Name''' ).data()
print(tx2)
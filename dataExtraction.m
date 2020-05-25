%GDP Autonomous Airship 2020
%np3217 01333401
%testing out how to extract data from database

data = webread('https://airship-a31a9.firebaseio.com/.json');
x = fieldnames(data.commands);  %get unique ID field names
y = char(x(1))                  %oldest field name saved as string
data.commands.(y).manoeuvre     %access sub fields
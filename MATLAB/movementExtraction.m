%GDP Autonomous Airship 2020
%np3217 01333401
%pull info relating to blimp movements from remote database

%%
clear; clc;
dataURL = 'https://airship-a31a9.firebaseio.com/.json';

command = movement(dataURL)
%% Function
function command = movement(dataURL)
    i = 2;
    while true
        data = webread(dataURL);
        upperLim = size(data.commands);
        while i <= upperLim(1)
            if data.commands{i,1}.complete == 0
                command = data.commands{i,1}.manoeuvre
            end
            i = i + 1;
            pause(1)
        end
    end
end
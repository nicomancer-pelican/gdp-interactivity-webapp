%GDP Autonomous Airship 2020
%np3217 01333401
%communication with database to retrieve user inputs from the web app

%% LOOP - once a second or something
clear; clc;
dataURL = 'https://airship-a31a9.firebaseio.com/.json';
i = 1;

while true
    data = webread(dataURL);
    uniqueID = fieldnames(data.commands);
    
    current = char(uniqueID(i));  %get the uniqueID of the current command
    manoeuvre = data.commands.(current).manoeuvre;  %current manoeuvre
    
    switch manoeuvre
        case {'triangle','Triangle'}
            triangle();
            pause(2)
        case {'square','Square'}
            square();
            pause(2)
        case {'ellipse','Ellipse'}
            ellipse()
            pause(2)
        otherwise
            disp('error: unrecognised manoeuvre')
    end
    i = i + 1;
end

%% Functions for demo
function triangle()
    load('triangle.mat')
    figure; hold on;
    axis([-1,11,-1,11])
    grid on;
    title('Triangle manoeuvre')
    for i=1:300
        plot(x(1:i),y(1:i),'--','color','k')
        pause(0.03)
    end
    pause(0.1)
    close all;
end

function square()
    load('square.mat')
    figure; hold on;
    axis([-1,11,-1,11])
    grid on;
    title('Square manoeuvre')
    for i=1:401
        plot(x(1:i),y(1:i),'--','color','k')
        pause(0.01)
    end
    pause(0.1)
    close all;
end

function ellipse()
    load('doughnut.mat')
    figure; hold on;
    axis([-1,11,-1,11])
    grid on;
    title('Ellipse manoeuvre')
    for i=1:401
        plot(x(1:i),y(1:i),'--','color','k')
        pause(0.01)
    end
    pause(0.1)
    close all;
end











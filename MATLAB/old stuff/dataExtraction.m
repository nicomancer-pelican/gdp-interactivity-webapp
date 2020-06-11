%GDP Autonomous Airship 2020
%np3217 01333401
%communication with database to retrieve user inputs from the web app

%% LOOP - once a second or something
clear; clc;
dataURL = 'https://airship-a31a9.firebaseio.com/.json';

 command(dataURL);
% colour(dataURL);
% sounds(dataURL);
%% COMMAND FUNCTION
function command(dataURL)
    i = 1;
    figure; hold on;
    axis([-1,11,-1,11])
    grid on;
    title('Manoeuvre')
    while true
        data = webread(dataURL);
        uniqueID = fieldnames(data.commands);
        queue = size(uniqueID);
        upperLim = queue(1);

        while i < upperLim
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
        pause(1)
    end
end

%% COLOUR FUNCTION
function colour(dataURL)
    i = 1;
    figure; hold on;
    axis([0,1,0,1])
    grid on;
    title('LED Colour')
    h = area([0,1],[1,1]);
    set(h,'facecolor',[1 1 1])
    while true
        data = webread(dataURL);
        uniqueID = fieldnames(data.lights);
        queue = size(uniqueID);
        upperLim = queue(1);

        if i < upperLim
            current = char(uniqueID(i));  %get the uniqueID of the current command
            colour = data.lights.(current).colour;  %current manoeuvre

            switch colour
                case {'red','Red'}
                    set(h,'facecolor',[0.6350 0.0780 0.1840])
                    pause(2)
                case {'orange','Orange'}
                    set(h,'facecolor',[0.8500 0.3250 0.0980])
                    pause(2)
                case {'yellow','Yellow'}
                    set(h,'facecolor',[0.9290 0.6940 0.1250])
                    pause(2)
                case {'green','Green'}
                    set(h,'facecolor',[0.4660 0.6740 0.1880])
                    pause(2)
                case {'blue','Blue'}
                    set(h,'facecolor',[0 0.4470 0.7410])
                    pause(2)
                case {'purple','Purple'}
                    set(h,'facecolor',[0.4940 0.1840 0.5560])
                    pause(2)
                case {'white','White'}
                    set(h,'facecolor',[1 1 1])
                    pause(2)
                otherwise
                    disp('error: invalid colour')
            end
            i = i + 1;
        end
        pause(1)
    end
end

%% SOUND FUNCTION
function sounds(dataURL)
    i = 1;
    T1 = audioread('./audio/T1.mp3');
    T2 = audioread('./audio/T2.mp3');
    T3 = audioread('./audio/T3.mp3');
    T4 = audioread('./audio/T4.mp3');
    while true
        data = webread(dataURL);
        uniqueID = fieldnames(data.sounds);
        queue = size(uniqueID);
        upperLim = queue(1);

        if i < upperLim
            current = char(uniqueID(i));  %get the uniqueID of the current command
            track = data.sounds.(current).track;  %current manoeuvre

            switch track
                case {'T1'}
                    sound(T1,44000)
                    pause(8)
                case {'T2'}
                    sound(T2,44000)
                    pause(7)
                case {'T3'}
                    sound(T3,44000)
                    pause(6)
                case {'T4'}
                    sound(T4,44000)
                    pause(6)
                otherwise
                    disp('error in sound options')
            end
            i = i + 1;
        end
        pause(1)
    end
end

%% Extra functions for commands demo
function triangle()
    load('triangle.mat')
    for i=1:300
        h(i) = plot(x(1:i),y(1:i),'--','color','k');
        pause(0.03)
    end
    delete(h);
end

function square()
    load('square.mat')
    for i=1:401
        h(i) = plot(x(1:i),y(1:i),'--','color','k');
        pause(0.03)
    end
    delete(h);
end

function ellipse()
    load('ellipse.mat')
    for i=1:401
        h(i) = plot(x(1:i),y(1:i),'--','color','k');
        pause(0.03)
    end
    delete(h);
end











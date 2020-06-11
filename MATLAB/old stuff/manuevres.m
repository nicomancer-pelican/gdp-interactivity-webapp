clc; clear; close all;

man="8"; % manuevre keyword 
f=10; % - sampling rate - discretisation per sec
t = 10; % seconds, total time for manuevre

a=3; % curve diamter in m
ang = 0:360/(f*t) :360;

if man == "figure8" || man == "8"
    x=a.*sind(ang);
    y=a.*sind(ang).*cosd(ang);
    
elseif man == "donut" || man == "circle"
    x=a.*sind(ang);
    y=a.*cosd(ang);
    
elseif man == "s"
    x=ang/360;
    y=a/2*sind(ang);
else
    %speaker response
    error('wrong manuevre');
end

inst=zeros(f*t,2);
dy=y(2:end)'-y(1:end-1)';
dx=x(2:end)'-x(1:end-1)';
%heading angle corresponding to global x y, not local
inst(:,1)=atand(dy./dx);  
%velocity
inst(:,2)=(dy.^2+dx.^2).^0.5; 
axis equal
plot(x,y)
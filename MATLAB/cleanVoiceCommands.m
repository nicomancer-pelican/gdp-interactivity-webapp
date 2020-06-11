function response = cleanVoiceCommands
%cleanVoiceCommands -- when mission ends or when voice commands is
%diactivated, this function should be run to clean the relevant section of
%the database
%
%   INPUTS: none
%   OUTPUS: none
%
%   np3217, 01333401, 11/06/2020
%   written for the Autonomous Airship 2020 Group Design Project
%   Imperial College London, Department of Aeronautics

    URL = 'https://airship-a31a9.firebaseio.com/commands.json';
    options = weboptions('KeyName', 'X-HTTP-Method-Override', 'KeyValue','DELETE');
    webwrite(URL,options);
end
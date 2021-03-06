function updateVoiceCommands(i)
%updateVoiceCommands -- once a command has been completed, update the
%database to reflect this
%
%   INPUTS: database position of command completed
%   OUTPUS: none
%
%   np3217, 01333401, 11/06/2020
%   written for the Autonomous Airship 2020 Group Design Project
%   Imperial College London, Department of Aeronautics

    %update status of complete to true
    URL = sprintf('https://airship-a31a9.firebaseio.com/commands/%d/complete.json',i);
    options = weboptions('KeyName', 'X-HTTP-Method-Override', 'KeyValue','PUT');
    webwrite(URL,'true',options);
end
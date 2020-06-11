function result = extractVoiceCommands(i)
%extractVoiceCommands -- get data related to voice commands from the online
%   database and prep to send to the airship.
%
%   INPUTS: database queue position
%   OUTPUS: result -- if the command has already been completed, result =
%   0, if the command has not been completed, returns a string of the
%   command text.
%
%   np3217, 01333401, 11/06/2020
%   written for the Autonomous Airship 2020 Group Design Project
%   Imperial College London, Department of Aeronautics


    %get data from the online database (a firebase realtime database)
    dataURL = sprintf('https://airship-a31a9.firebaseio.com/commands/%d.json',i);
    data = webread(dataURL);
    
    if data.complete == 0
        result = data.manoeuvre;
    else
        result = 0;
    end     
end
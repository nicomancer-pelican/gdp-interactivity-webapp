<template>
  <header>
    Voice Command
    <div>
      <button id='button'>Start listening</button>
    </div>
    <div id='result'></div>
      <p id='message' hidden aria-hidden='true'>
        Your browser doesn't support Speech Recognition. Sorry.
      </p>
  </header>
</template>

<script src="src/scripts/command.js">

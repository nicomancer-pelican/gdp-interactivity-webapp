<template>
  <q-page>
    <h6>Speech colour changer</h6>

    <p>Tap/click then say a color to change the background color of the app.</p>

    <p class="hints"></p>
      Try:
      <span style="background-color:aqua;"> aqua, </span>
      <span style="background-color:azure;"> azure, </span>
      <span style="background-color:beige;"> beige, </span>
      <span style="background-color:bisque;"> bisque, </span>
      <span style="background-color:blue;"> blue, </span>
      <span style="background-color:brown;"> brown, </span>
      <span style="background-color:chocolate;"> chocolate, </span>
      <span style="background-color:coral;"> coral, </span>
    <div>
        <p class="output">Result received: white</p>
    </div>

  </q-page>
</template>

<style>
    body {
        background: white;
    }
</style>

<script>
export default {
}
</script>

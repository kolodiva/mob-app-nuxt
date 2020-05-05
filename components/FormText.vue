<template>
  <div>
    <label>{{ label }}</label>
    <p>
      <input
        :id="id"
        class="input"
        type="text"
        :placeholder="label"
        :value="value"
        :required="required"
      />
    </p>
  </div>
</template>

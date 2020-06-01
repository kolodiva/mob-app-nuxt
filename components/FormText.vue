<template>
  <div>
    <label>{{ label }}</label>
      <input
        :id="id"
        class="input"
        type="text"
        :placeholder="label"
        :value="value"
        :required="required"
      />
  </div>
</template>

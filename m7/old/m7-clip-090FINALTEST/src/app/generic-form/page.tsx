'use client'
import { FormEvent } from 'react';
export default function GenericForm() {

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    alert("Submit Pressed!");
  }


  return (
    <form onSubmit={handleSubmit} >
      <input type="email" id="email" name="email" /><br />
      <input type="text" id="firstName" name="firstName" /><br />
      <input type="text" id="lastName" name="lastName" /><br />
      <input type="submit" value="Submit" />
    </form>
  );
}
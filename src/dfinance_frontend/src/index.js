import { dfinance_backend } from "../../declarations/dfinance_backend";

window.addEventListener("load", async () => {
  update();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");
  const input = parseFloat(document.getElementById("input-amount").value);
  const withdraw = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled",true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dfinance_backend.topUp(input);
  }
  if (document.getElementById("withdrawal-amount").value.length !=0) {
    await dfinance_backend.withdraw(withdraw);
  }

  await dfinance_backend.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

var update = async () => {
  const currentAmount = await dfinance_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}
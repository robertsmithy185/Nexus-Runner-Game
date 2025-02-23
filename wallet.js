document
  .getElementById("connect-wallet")
  .addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        alert("Connected: " + accounts[0]);
      } catch (error) {
        console.error("Connection failed", error);
      }
    } else {
      alert("Please install Metamask.");
    }
  });

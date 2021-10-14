const disableLog = () => {
  if (import.meta.env.PROD) {
    // console.log = () => 0;
  }
};

disableLog();

const disableLog = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => 0;
  }
};

disableLog();

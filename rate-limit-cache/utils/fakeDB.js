export const getDataFromDB = async () => {
  await new Promise((r) => setTimeout(r, 3000));
  return { message: "DB result: ", ts: Date.now() };
};

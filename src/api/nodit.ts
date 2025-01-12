export const getLockedAmount = async (
  request_id: number,
): Promise<string | null> => {
  const url =
    "https://aptos-testnet.nodit.io/efkSOHP1Q3VVs8udkxRi1rrufsXQhuYS/v1/view";
  const bodyData = {
    function:
      "67a5c0efdea05102041bb5b2bb8d52f271742baa4b6f15aee1a1d048010890f1::translation_request_fund::get_locked_amount",
    type_arguments: [],
    arguments: [`${request_id}`],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return (data[0] / Math.pow(10, 8)).toFixed(3).toString() || null;
  } catch (error) {
    console.error("Error in API request:", error);
    return null;
  }
};

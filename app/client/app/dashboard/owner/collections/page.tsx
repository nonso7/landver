"use client";
import { useEffect, useState } from "react";
import { useReadContract } from "@starknet-react/core";
import Spinner from "@/app/components/ui/Spinner";
import { ABI } from "../../../abis/landRegistry.abi";
import { useAppContext } from "../../../context/appContext";

const Page = () => {
  const [loading, setLoading] = useState(false);
  //const [landId, setLandId] = useState<number>(2);

  const { contactAddress } = useAppContext();

  //const shouldFetch = !!contactAddress;
  const { data, error, isLoading } = useReadContract({
    abi: ABI,
    address: contactAddress as `0x${string}`,
    //"0x00a74ca9b3f9fb5941b5fc53ea383995b4d8b8ee7b40b323ac1bb260d44f00d2"
    functionName: "get_lands_by_owner",
    args: [],
    watch: false,
    
  });


  useEffect(() => {
    if (data) {
      console.log("Land data:", data);
      const json = JSON.stringify(data)
      console.log(json)
    }
    if (error) {
      console.error("Contract read error:", error);
    }
  }, [data, error]);



  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Land Details</h1>
      {isLoading || loading ? (
        <Spinner/>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Page;

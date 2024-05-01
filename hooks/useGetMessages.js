import { useAuth } from "@/contexts/AuthContext";
import useConversation from "@/zustand/useConversation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          process.env.SECRET_API +
            `/api/v1/messages/${selectedConversation._id}/${user.id}`
        );
        const data = await res.json();
        console.log(data);
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages, user.id]);

  return { messages, loading };
};
export default useGetMessages;

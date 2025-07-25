"use client";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import voice from "../../../public/chat/microphone-2.svg";
import cap from "../../../public/chat/cap.svg";
import lang from "../../../public/chat/language.svg";
import send from "../../../public/chat/send.svg";
import Image from "next/image";
import back from "../../../public/back icon/arrow-right.png";
import chat from "../../../public/chat/chatmob.svg";
import lang1 from "../../../public/chat/moblang.svg";

const contacts = [
  {
    id: 1,
    name: "Vivek Kumar",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    duration: "4:59 mins",
    years: "7 Years",
    languages: "Hindi, English",
    status: "Busy",
  },
  {
    id: 2,
    name: "Radhika Mehta",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    duration: "4:59 mins",
    years: "7 Years",
    languages: "Hindi, English",
    status: "Free",
  },
  {
    id: 3,
    name: "Raj Singh",
    avatar: "https://cdn-icons-png.flaticon.com/512/9193/9193737.png",
    duration: "4:59 mins",
    years: "7 Years",
    languages: "Hindi, English",
    status: "Free",
  },
  {
    id: 4,
    name: "Ram Singh",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219987.png",
    duration: "4:59 mins",
    years: "7 Years",
    languages: "Hindi, English",
    status: "Busy",
  },
];

export default function ChatScreen() {
  
  const [messages, setMessages] = useState({
    1: [
      {
        type: "text",
        content:
          "Welcome to Astrovachan. Consultant will take a minute to analyze your details. You may ask your question in the meanwhile. ",
        sender: "other",
        timestamp: "10:30 AM",
      },
    ],
    2: [
      {
        type: "text",
        content: "Hey, how are you?",
        sender: "other",
        timestamp: "11:45 AM",
      },
    ],
    3: [
      {
        type: "text",
        content: "Good morning!",
        sender: "other",
        timestamp: "8:15 AM",
      },
    ],
    4: [
      {
        type: "text",
        content: "Kaise ho!",
        sender: "other",
        timestamp: "8:15 AM",
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContact, setSelectedContact] = useState(contacts.length > 0 ? contacts[0] : null);
  
  useEffect(() => {
    if (contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);
  

  const sendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = selectedFile
      ? {
          type: "media",
          content: selectedFile,
          sender: "me",
          timestamp: currentTime,
        }
      : {
          type: "text",
          content: newMessage,
          sender: "me",
          timestamp: currentTime,
        };

    setMessages({
      ...messages,
      [selectedContact.id]: [...messages[selectedContact.id], newMsg],
    });

    setNewMessage("");
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(fileURL);
    }
  };

  return (
  <div className="flex items-center justify-center h-screen bg-white">
  <div className="lg:w-[89.4%] w-[100%] lg:h-[82%] h-[100%] bg-white border-2 lg:border-[#CDB9DB] border-white lg:rounded-lg flex">
    {/* Left Sidebar */}
    <div
  className={`lg:w-1/4 w-full bg-white border-r border-gray-300 lg:rounded-l-lg ${
    selectedContact ? "hidden lg:block" : "block"
  }`}
>
      <h2 className="mt-[54px] lg:mt-0 font-[500] lg:p-[21.5px] px-[16px] py-[12px] bg-[#67308C] text-white rounded-tl-lg font-roboto lg:text-[24px] text-[18px] tracking-[-0.72px] flex">
        <Image
          src={back}
          alt="arrow icon"
          className="lg:hidden h-[22px] w-[22px] mr-[8px] cursor-pointer"
          onClick={() => setSelectedContact(null)} // Hide chat when back icon is clicked on mobile
        />
        <span>Chat</span>
      </h2>
      <div className="mt-4">
        <h3 className="font-[500] mb-2 px-[24px] text-[16px] pb-[8px] border-b border-[#CDB9DB] font-roboto lg:text-[18px] tracking-[-0.56px] text-[#151514]">
          Live
        </h3>
        {selectedContact && (
          <div className="px-[24px] py-[16px] bg-[#F9F4FD] text-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{selectedContact.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Image src={cap} alt="Years" className="w-4 h-4 hidden lg:block" />{" "}
                  <Image src={chat} alt="Years" className="w-4 h-4 lg:hidden block" />
                  {selectedContact.years}
                  <span>•</span>
                  <Image src={lang} alt="Language" className="w-4 h-4 block lg:hidden" />{" "}
                  <Image src={lang1} alt="Years" className="w-4 h-4 lg:hidden block" />
                  {selectedContact.languages}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                selectedContact.status === "Free" ? "text-green-500" : "text-red-500"
              }`}
            >
              {selectedContact.status}
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="font-[500] p-4 border-b border-[#CDB9DB] font-roboto hidden lg:block text-[18px] tracking-[-0.56px] text-[#151514]">
          Previously Talked
        </h3>
        <h3 className="font-[500] p-4 border-b border-[#CDB9DB] font-roboto text-[16px] tracking-[0.16px] text-[#151514] lg:hidden ">
          Waiting List
        </h3>
        {contacts
          .filter((c) => c.id !== selectedContact?.id)
          .map((contact) => (
            <div
              key={contact.id}
              className="px-[24px] py-[16px] cursor-pointer flex items-center justify-between hover:bg-gray-300"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center gap-3 ">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                  <Image src={cap} alt="Years" className="w-4 h-4 hidden lg:block" />{" "}
                  <Image src={chat} alt="Years" className="w-4 h-4 lg:hidden block" />
                    {contact.years}
                    <span>•</span>
                    <Image src={lang} alt="Language" className="w-4 h-4 lg:block hidden" />{" "}
                    <Image src={lang1} alt="Years" className="w-4 h-4 lg:hidden block" />
                    {contact.languages}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  contact.status === "Free" ? "text-green-500" : "text-red-500"
                }`}
              >
                {contact.status}
              </span>
            </div>
          ))}
      </div>
    </div>

    {/* Chat Screen */}
    {selectedContact && (
      <div className="w-full lg:w-3/4 flex-col rounded-r-lg flex">
        {/* Chat Header */}
        <div className="p-[15px] bg-[#67308C] text-white flex items-center justify-between w-full rounded-tr-lg mt-12 lg:mt-0">
          <div className="flex items-center gap-3">
            <img
              src={selectedContact.avatar}
              alt={selectedContact.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-[500] font-roboto lg:text-[20px] text-[14px]  lg:tracking-[-0.6px] tracking-[-0.42px] text-white">
                {selectedContact.name}
              </p>
              <p className="lg:text-sm text-[10px] text-gray-200">{selectedContact.duration}</p>
            </div>
          </div>

          {/* Close Icon */}
          <button className="text-white text-xl" onClick={() => setSelectedContact(null)}>
            <FiX />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col gap-3">
          {messages[selectedContact.id]?.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "other" && (
                <img src={selectedContact.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-3" />
              )}

              <div
                className={`max-w-[75%] bg-[#F9F4FD] text-black p-3 rounded-lg shadow-md flex ${
                  msg.type === "text" && msg.content.length <= 20
                    ? "inline-flex items-center gap-2"
                    : "flex-col"
                }`}
              >
                {msg.type === "text" ? (
                  <p className="break-words font-roboto  lg:text-[16px] text-[14px] tracking-[0.18px] text-[#151514]">
                    {msg.content}
                  </p>
                ) : (
                  <img src={msg.content} alt="Sent Media" className="w-48 rounded-lg shadow-md" />
                )}
                <span
                  className={`text-xs text-gray-500 ${
                    msg.type === "text" && msg.content.length <= 20
                      ? "ml-2"
                      : "text-right mt-1 self-end"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === "me" && (
                <img src="https://cdn-icons-png.flaticon.com/512/2321/2321157.png" alt="You" className="w-8 h-8 rounded-full ml-3" />
              )}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white flex items-center rounded-b-lg ">
            <div className="relative flex items-center w-full">
              {/* File Input */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/,video/"
                onChange={handleFileChange}
              />

              {/* Plus Icon for Media */}
              <label
                htmlFor="fileInput"
                className="absolute left-3 text-[#67308C] text-xl cursor-pointer"
              >
                <FiPlus />
              </label>

              {/* Input Field */}
              <input
                type="text"
                className="w-full p-3 pl-10 pr-10  rounded-[12px] focus:outline-none bg-[#F9F4FD] font-roboto text-[16px]"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              {/* Dynamic Icon: Voice/Send */}
              <span className="absolute right-3 text-gray-500 text-xl cursor-pointer">
                {newMessage.trim() || selectedFile ? (
                  <Image
                    src={send}
                    className="w-6 h-6"
                    onClick={sendMessage}
                    alt="send"
                  />
                ) : (
                  <Image src={voice} className="w-6 h-6" alt="voice" />
                )}
              </span>
            </div>

            {/* Media Preview */}
            {selectedFile && (
              <div className="ml-4 relative">
                <img
                  src={selectedFile}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
      </div>
    )}
  </div>
</div>

  );
}

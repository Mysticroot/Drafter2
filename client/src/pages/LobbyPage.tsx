import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

export default function LobbyPage() {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [roomIdInput, setRoomIdInput] = useState("");

  // --------------------
  // Socket listeners
  // --------------------
  useEffect(() => {
    if (!socket) return;

    const handleRoomCreated = (data: { roomId: string }) => {
      navigate(`/game/${data.roomId}`);
    };

    const handleMatchStart = (data: { matchState: { id: string } }) => {
      // Match started, navigate to game
      navigate(`/game/${data.matchState.id}`);
    };

    socket.on("room:created", handleRoomCreated);
    socket.on("match:start", handleMatchStart);

    return () => {
      socket.off("room:created", handleRoomCreated);
      socket.off("match:start", handleMatchStart);
    };
  }, [socket, navigate]);

  // --------------------
  // Actions
  // --------------------
  const createRoom = () => {
    socket?.emit("room:create");
  };

  const joinRoom = () => {
    if (!roomIdInput.trim()) return;
    socket?.emit("room:join", { roomId: roomIdInput.trim() });
  };

  // --------------------
  // UI
  // --------------------
 return (
   <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
     <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-8 border border-slate-700">
       <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent">
         Anime Draft Arena
       </h1>
       <p className="text-slate-400 text-center mb-8">
         Strategic anime character drafting battle
       </p>

       {/* Toggle */}
       <div className="flex gap-2 mb-6 bg-slate-700 rounded-lg p-1">
         <button
           onClick={createRoom}
           className="flex-1 py-2 rounded font-semibold transition-colors bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900"
         >
           Create Room
         </button>
       </div>

       {/* Join Room Card */}
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-slate-300 mb-2">
             Room ID
           </label>
           <input
             type="text"
             value={roomIdInput}
             onChange={(e) => setRoomIdInput(e.target.value)}
             placeholder="Enter room ID"
             className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
           />
         </div>

         <button
           onClick={joinRoom}
           disabled={!roomIdInput.trim()}
           className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
         >
           Join Room
         </button>
       </div>

       {/* Info */}
       <div className="mt-8 pt-8 border-t border-slate-700">
         <h3 className="text-lg font-semibold mb-3">How to Play</h3>
         <ul className="text-sm text-slate-400 space-y-2">
           <li>✓ Draw random characters from a deck</li>
           <li>✓ Assign to one of 5 team roles</li>
           <li>✓ Use skip once to discard a card</li>
           <li>✓ Win by highest role-specific stats</li>
         </ul>
       </div>
     </div>
   </div>
 );

}

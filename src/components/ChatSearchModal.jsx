export const ChatSearchModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const { chatList, setCurrentChat, setCurrentProject } = useChatting();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (search.trim() !== "") {
      setIsLoading(true);
      setShowNoResult(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowNoResult(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setShowNoResult(false);
    }
  }, [search]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div
        ref={modalRef}
        className="w-180 h-120 flex flex-col items-center justify-start border border-gray-300 bg-white rounded-xl shadow-xl"
      >
        {/* 모달 내부 UI 그대로 유지 */}
      </div>
    </div>,
    document.body
  );
};

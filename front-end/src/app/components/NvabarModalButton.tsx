import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../AppContext";
import { IoReorderThreeOutline } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import Modal from "./NavbarModal";

export default function NvabarModalButton() {
    const context = useAppContext();

  return (
    <>
        <div className="flex justify-center items-center lg:hidden">
              <AnimatePresence>
                {context.isNavbarModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Modal />
                  </motion.div>
                )}
              </AnimatePresence>
              {!context.isNavbarModalOpen && (
                <div
                  className="bg-slate-200 rounded-full p-1"
                  onClick={() => context.setNavbarModalOpen(true)}
                >
                  <IoReorderThreeOutline size="30" />
                </div>
              )}
              {context.isNavbarModalOpen && (
                <div
                  className="bg-slate-200 rounded-full p-1 h-10 w-10 flex justify-center items-center"
                  onClick={() => context.setNavbarModalOpen(false)}
                >
                  <VscChromeClose size="20" />
                </div>
              )}
            </div>
    </>
  )
}

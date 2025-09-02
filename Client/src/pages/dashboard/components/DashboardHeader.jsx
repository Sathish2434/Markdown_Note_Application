import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../../components/ui/Button";
import SearchBar from "./SearchBar";
import Icon from "../../../components/AppIcon";

const DashboardHeader = ({
  notesCount,
  onSearch,
  onRefresh,
  isRefreshing,
  searchTerm,
}) => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/markdown-editor");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-16 z-40 backdrop-blur-lg bg-background/80 dark:bg-background/60 border-b border-border shadow-md"
    >
      <div className="px-4 lg:px-8 py-5 flex flex-col gap-4">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <motion.span
                initial={{ rotate: -15 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  name="Notebook"
                  size={28}
                  className="text-primary dark:text-primary/80"
                />
              </motion.span>
              My Notes
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {notesCount === 0
                ? "No notes yet"
                : `${notesCount} ${notesCount === 1 ? "note" : "notes"}`}
              {searchTerm && (
                <span className="ml-1">
                  • Searching for{" "}
                  <span className="font-medium text-primary">"{searchTerm}"</span>
                </span>
              )}
            </p>
          </motion.div>

          {/* Desktop Create Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hidden sm:flex"
          >
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={handleCreateNote}
              className="shadow-lg hover:shadow-primary/40 transition-all"
            >
              Create Note
            </Button>
          </motion.div>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center justify-between gap-3">
          {/* Search Bar */}
          <motion.div
            className="flex-1 max-w-lg"
            whileFocus={{ scale: 1.02 }}
          >
            <SearchBar
              onSearch={onSearch}
              placeholder="Search notes by title or content..."
              className="rounded-xl shadow-inner dark:shadow-none 
                         focus-within:ring-2 focus-within:ring-primary/50 
                         transition-all"
            />
          </motion.div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Refresh */}
            <motion.div whileTap={{ rotate: 90 }}>
              <Button
                variant="ghost"
                size="icon"
                iconName="RefreshCw"
                iconSize={18}
                onClick={onRefresh}
                loading={isRefreshing}
                className="rounded-full hover:bg-primary/10 hover:text-primary 
                           dark:hover:bg-primary/20 transition-all"
              />
            </motion.div>

            {/* View Options */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="ghost"
                size="icon"
                iconName="Grid3X3"
                iconSize={18}
                className="hidden md:flex rounded-full 
                           hover:bg-primary/10 hover:text-primary 
                           dark:hover:bg-primary/20 transition-all"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Create Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="sm:hidden"
      >
        <Button
          variant="default"
          size="icon"
          iconName="Plus"
          iconSize={22}
          onClick={handleCreateNote}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full 
                     shadow-lg shadow-primary/40 
                     bg-gradient-to-r from-primary to-primary/80 
                     animate-pulse"
        />
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader;

"""A transient text pad documentation fixture, with no file persistence."""
import tkinter as tk


def main():
    root = tk.Tk()
    root.title("Scratch Pad")
    editor = tk.Text(root, wrap="word", width=60, height=20)
    editor.pack(fill="both", expand=True)
    editor.focus_set()
    root.mainloop()


if __name__ == "__main__":
    main()

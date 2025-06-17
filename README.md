# Enigma Simulator 

This web application is a browser-based simulation of the Enigma machines used in World War II by the Germans and others to encrypt and decrypt messages. In the default mode, the simulator demonstrates the actual behaviour of the machine: when the operator presses a key, the machine encrypts it, mapping it to some other letter, which is indicated by the lamp board. By clicking the keyboard button in the top right corner, you can switch to text mode, allowing you to view the entire original and encoded texts for convenience. 

## How the Enigma Machines Worked 

The machines were equipped with a manual keyboard (similar to a typewriter), a lamp board (a copy of the keyboard in the form of backlit windows with letters printed on), a plugboard, and a mechanism of rotors and disks attached together. A key press would produce an electrical signal, which would then pass through the plugboard, through the entry disk, right to left through each rotor, through the reflector, back through each rotor from left to right, back through the entry disk and the plugboard, and finally to the lamp board, where the result would appear. 

### The Plugboard 
After a key was pressed, the signal would go through the plugboard. This component had ports for each letter, allowing the operator to swap letters by connecting their ports using cables. So, if the 'A' key is pressed and A was plugged into Z, the rotor assembly would receive the 'Z' signal. If A was not connected to another letter, it would remain as an 'A'. 

### The Rotors 
The heavy lifting of the encryption process was done by the rotors. These were metal disks with 26 contacts or pins on each side, each one corresponding to a single letter. Inside, each contact on the right was wired to a single pin on the left. This produced a mapping of input letters to output letters. So, if the signal enters the rotor as 'Z', and the 'Z' is wired to 'M', it leaves the rotor as 'M'. 

Each rotor has the letters (or numbers from 1 to 26, in the case of the Enigma I) printed on the edge. The letter that is visible through the display window indicates the current position of the rotor. The rotor closest to the right (from the perspective of the operator) moves forward by one letter every time a letter is encrypted, and the other rotors move less frequently. 

At specific positions, each rotor triggers rotor to its left to move forward by one position. The rotors for the early models had only one position that would trigger the next rotor, so like a car odometer, they would trigger the next rotor once every time they made a complete revolution. Some later model rotors had two or more such positions, increasing the complexity and making the encryption more difficult to break. 

Before receiving the signal from the keyboard, the rotor on the right always moves forward by one position, and any other rotors that were triggered to move also move. 

The signal from the plugboard goes through the entry disk first, then it enters a contact on the left side of the rotor on the right. If the rotor is at position 'A', it enters whichever contact would normally correspond to the letter the signal represents. Otherwise, it enters whichever contact happens to be in that position - in other words, if the rotor is at position 'C' and receives signal 'A', it interprets the 'A' as a 'C'. 

The signal exits as some other letter from the left side of the rotor, and then enters the right side of the next rotor. This repeats, re-mapping the letter each time, until the signal leaves the leftmost rotor. From there, it passes through the reflector. The reflector is a fixed disk (it does not move), which maps one letter to another before passing it back the way it came. The signal passes back through all the rotors in the opposite direction, back through the entry disk, back through the plugboard, and to the lamp board. 
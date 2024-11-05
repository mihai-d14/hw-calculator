       IDENTIFICATION DIVISION.
       PROGRAM-ID. HW-CALCULATOR.
       
       ENVIRONMENT DIVISION.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 W-FREQUENCY         PIC 9(1)V9(8).
       01 W-Q-FREQUENCY       PIC 9(1)V9(8).
       01 W-AA-FREQ          PIC 9(1)V9(8).
       01 W-AQ-FREQ          PIC 9(1)V9(8).
       01 W-QQ-FREQ          PIC 9(1)V9(8).
       01 W-WORK             PIC Z(1)9.9(8).
       01 W-RESPONSE.
          05 FILLER          PIC X(2) VALUE '{"'.
          05 FILLER          PIC X(4) VALUE 'aa":'.
          05 W-AA-STR        PIC X(10).
          05 FILLER          PIC X(6) VALUE ',"aq":'.
          05 W-AQ-STR        PIC X(10).
          05 FILLER          PIC X(6) VALUE ',"qq":'.
          05 W-QQ-STR        PIC X(10).
          05 FILLER          PIC X(1) VALUE '}'.

       PROCEDURE DIVISION.
           ACCEPT W-FREQUENCY
           
           COMPUTE W-Q-FREQUENCY = 1 - W-FREQUENCY
           
           COMPUTE W-AA-FREQ = W-FREQUENCY * W-FREQUENCY
           COMPUTE W-AQ-FREQ = 2 * W-FREQUENCY * W-Q-FREQUENCY
           COMPUTE W-QQ-FREQ = W-Q-FREQUENCY * W-Q-FREQUENCY
           
           MOVE W-AA-FREQ TO W-WORK
           MOVE W-WORK TO W-AA-STR
           
           MOVE W-AQ-FREQ TO W-WORK
           MOVE W-WORK TO W-AQ-STR
           
           MOVE W-QQ-FREQ TO W-WORK
           MOVE W-WORK TO W-QQ-STR
           
           DISPLAY W-RESPONSE
           
           STOP RUN.
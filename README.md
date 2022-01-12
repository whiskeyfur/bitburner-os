# bitburner-os

Just a collection of scripts I use for my instance of the Bitburner game. The approach I take is a slightly different one than to have everything running in separate loops.
Instead, I have a single loop that calls every other script as a cron job.


One. HUGE glaring problen with this approach.. going offline is actually bad, because when a script finishes running, it's dead. And since the crontab program itself does not generate income, ergo you get no cash advance for the time lost.
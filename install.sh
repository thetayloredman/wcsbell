echo "WCSBell Installer for Debian/Ubuntu"
echo "Don't worry -- we'll tell you what we're going to do."
echo -n "Calculating changes..."
install_node=0
[[ ! -f /usr/bin/node ]] && install_node=1
install_mplayer=0
which mplayer > /dev/null 2>&1 || install_mplayer=1
echo " done."
dashes=""
dashes_count=0
while true; do
    dashes="$dashes="
    dashes_count="$(( dashes_count + 1 ))"
    if [[ "$dashes_count" -eq "$COLUMNS" ]]; then break; fi
done
echo "$dashes"
echo "     The following changes will be applied."
echo ">>> READ CAREFULLY."
[[ "$install_node" -eq 1 ]] && echo "The NodeSource repository will be added to sources.list."
[[ "$install_node" -eq 1 ]] && echo "Node.js will be installed (apt-get install nodejs)"
[[ "$install_mplayer" -eq 1 ]] && echo "mplayer will be installed (apt-get install mplayer)."
[[ -f /etc/systemd/system/wcsbell.service ]] && echo "The systemd service will be removed (for upgrade)"
echo "The WCSBell sources will be installed/upgraded."
echo "The systemd service will be installed."
printf ">>> Do you want to continue? [y/N] "
read cont
case "$cont" in
    [yY]*)
        echo "Alright."
        ;;
    *)
        echo "Cancelled."
        exit 1
        ;;
esac

if [[ "$install_node" -eq 1 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt update
    sudo apt install nodejs -y
fi

[[ "$install_mplayer" -eq 1 ]] && sudo apt install mplayer -y

[[ -f /etc/systemd/system/wcsbell.service ]] && sudo rm -fv /etc/systemd/system/wcsbell.service

cd /usr/local/lib
[[ ! -d wcsbell ]] && sudo git clone https://github.com/thetayloredman/wcsbell.git || { cd wcsbell && sudo git pull; }
cd /usr/local/lib/wcsbell

sudo npm install

sudo ln -svf ../lib/wcsbell/index.js /usr/local/bin/wcsbell
sudo chmod +x /usr/local/lib/wcsbell/index.js

sudo cp wcsbell.service /etc/systemd/system/wcsbell.service
[[ ! -d /etc/wcsbell ]] && sudo mkdir /etc/wcsbell
[[ ! -f /etc/wcsbell/config.csv ]] && sudo cp config.csv /etc/wcsbell/config.csv
systemctl --user enable wcsbell
systemctl --user start wcsbell

echo "Done. WCSBell should now be running."
echo "Install sounds in /usr/local/lib/wcsbell/sounds."

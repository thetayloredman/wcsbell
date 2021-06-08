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
[[ -f /etc/systemd/system/wcsbell.service ]] && echo "The LEGACY systemd service will be removed (for upgrade)"
[[ -f ~/.config/systemd/user/wcsbell.service ]] && echo "The systemd service will be removed (for upgrade)"
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
[[ -f ~/.config/systemd/user/wcsbell.service ]] && rm -fv ~/.config/systemd/user/wcsbell.service

cd ~/.local/lib
[[ ! -d wcsbell ]] && git clone https://github.com/thetayloredman/wcsbell.git || { cd wcsbell && git pull; }
cd ~/.local/lib/wcsbell

npm install

ln -svf ../lib/wcsbell/index.js ~/.local/bin/wcsbell
chmod +x ~/.local/lib/wcsbell/index.js

[[ ! -d ~/.config/systemd/user ]] && mkdir -p ~/.config/systemd/user
cp wcsbell.service ~/.config/systemd/user/wcsbell.service
[[ ! -d ~/.config/wcsbell ]] && mkdir ~/.config/wcsbell
[[ ! -f ~/.config/wcsbell/config.csv ]] && cp config.csv ~/.config/wcsbell/config.csv
[[ ! -d ~/.config/wcsbell/sounds ]] && mkdir ~/.config/wcsbell/sounds
systemctl --user enable wcsbell
systemctl --user start wcsbell

echo "Done. WCSBell should now be running."
echo "Install sounds in ~/.config/wcsbell/sounds."
